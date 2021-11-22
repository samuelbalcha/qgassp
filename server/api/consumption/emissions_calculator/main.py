#!/usr/bin/python

import sys
import os
import time
import logging

import json
import pandas as pd
import numpy as np
import dataclasses as dc

import pathlib

def calculations_wrapper(input_data):
    logging.debug("begin calculations")
    emissions = {}
    for policy in input_data['policy_label']:
        emissions[policy], _ = baseline_calculations(input_data, policy)
    if input_data['partially_new_area'] and "BL" in emissions and "NA" in emissions:
        policy_year = 2025
        pop_size_new = 10000
        pop_size_old = 10000
        Emissions_PN = emissions['BL'].copy()
        Emissions_PN.loc[policy_year:2050] = ((emissions['NA'] * pop_size_new) + (emissions['BL'] * pop_size_old)) / (pop_size_new + pop_size_old)
        return Emissions_PN # previously Berlin_Emissions_PN
    return emissions['BL']
    
    
def baseline_calculations(input_data, policy):
    """
    #Baseline calculation here - policies is essentially the same calcualtion
    ###########Explanation#######################
    #The calculations work by describing the economy as being composed of 200 products, given by 'products'. 
    #For each product there is an emission intensity and they are collected together in ab_M. There are seperate emission
    #intensties for the 'direct production' and the 'indirect production' (rest of the supply chain). So ab_M is a 200 x 2
    #table
    #Some products that describe household fuel use for heat and also transport fuel use for cars have another emission 
    #intesntiy as well. These are held in seperate tables 'use_phase' and 'tail_pipe' (all other products have 0 here)

    #To calculate the Emissions, each value in ab_M + the values in use_phase and tail_pipe are multiplied by the amount
    #the household spends on each of the 200 products. These are stored in another table caled ab_Y (demand vector)
    #The emissions for each product from the direct production, indirect production, and use_phase/tail_pipe 
    #to get the total emissions for that product.

    #Once we have the total emissions for each product for that year, they are grouped together into 'sectors' that describe different things.
    #There are 7 in total: Household Energy, Household Other, transport fuels, transport other, air transport, food, 
    #tangible goods and  services

    #The calculations are performed every year until 2050, with the values of ab_Y and ab_M changing slighting each year.
    #This is based on 3 factors, efficiency improvements, changes in income and changes in household size. There is also a 
    #section where these projections can change as a result of different policies (for the baseline no policies are introduced)
    """
    ##################################################################################################################
    
        #Construction Emissions new part. 

    #This answers the question on the first policy page 
    #"2. Construction 
    #2.1 New planned residential buildings in total gross square meters, m2"

    North = ['Denmark', 'Finland' , 'Sweden' , 'Norway' , 'Iceland']

    West = ['Austria', 'Belgium', 'Germany', 'Spain', 'France' , 'Ireland', 'Italy' , 'Luxembourg' , 'Malta', 'Netherlands',
           'Portugal', 'United Kingdom', 'Switzerland' , 'Liechenstein']

    East = ['Bulgaria', 'Cyprus', 'Czechia', 'Estonia', 'Greece', 'Hungary', 'Croatia', 'Lithuania', 'Latvia', 'Poland', 
           'Romania', 'Slovenia', 'Slovakia', ]
    
    #Load the projections for income and housesize
    House_proj = pd.read_csv("Data/House_proj_exio.csv" , index_col = 0)
    Income_proj = pd.read_csv("Data/Income_proj_exio.csv" , index_col = 0)
    
    #Load the different Y vectors. 

    #The user selects which one
    #to use based on the urban density of the region (or the
    #average one for mixed regions or if they are unsure)
    Y_average = pd.read_csv("Demand_Vectors/Average_2020_Exio_elec_trans_en_Euro.csv", index_col = 0)
    Y_city = pd.read_csv("Demand_Vectors/City_2020_Exio_elec_trans_en_Euro.csv", index_col = 0)
    Y_rural = pd.read_csv("Demand_Vectors/Rural_2020_Exio_elec_trans_en_Euro.csv", index_col = 0)
    Y_town = pd.read_csv("Demand_Vectors/Town_2020_Exio_elec_trans_en_Euro.csv", index_col = 0)
    
    #Load the Use phase and tail pipe emissions. 

    Use_phase =  pd.read_csv("Data/Energy_use_phase_Euro.csv", index_col = 0)
    Tail_pipe =  pd.read_csv("Data/Tailpipe_emissions_bp.csv", index_col = 0)
    
    #Load default house sizes

    House_size = pd.read_csv("Data/Household_characteristics_2015.csv", index_col = 0)
    
    #Load the Emission intensities

    #M_countries is the standard Emissions factors
    M_countries = pd.read_csv("Emission_Intensities/Country_Emissions_intensities.csv", index_col = 0)

    #M_countries_LCA is the same as M_countries, but with the electricity sector replaced with individual LCA values
    #This is useful if there is local electricity production. The user can replace certain values with these values 
    #if needed
    M_countries_LCA = pd.read_csv("Emission_Intensities/Country_Emissions_intensities_LCA.csv", index_col = 0)
    products = M_countries.columns
    
    #Load the IW sectors

    #This is needed to put the emissions into different 'sectors', such as transport, food, building energy use, etc
    #os.chdir("C:/Users/PeterRobertWalke/Documents/QGASSP/Data sources/Calculation_Data/Updated")

    IW_sectors = pd.read_csv("Data/IW_sectors_reduced.csv", index_col = 0)
    IW_sectors_np = IW_sectors.to_numpy()
    IW_sectors_np_tr = np.transpose(IW_sectors_np)
    
    #Load the adjustable amounts.

    #This says how much electricity is spent on heating. There are some other things here but decided not to include.
    Adjustable_amounts = pd.read_csv("Data/Adjustable_energy_amounts.csv", index_col = 0)

    #Electricity prices database might need upstaing still

    #Load the electricity prices. This is so we know in monetary terms how much is being spent on electricity. The tool
    #at the moment has the electricity used by households in kWh. However, maybe this should now be changed?
    Electricity_prices = pd.read_csv("Data/electricity_prices_2019.csv", index_col = 0)
    
    #Load the fuel prices at basic price
    #We need this because of electric vehicles. The electricity and fuels need to be in the same units.

    Fuel_prices = pd.read_csv("Data/Fuel_prices_BP_attempt.csv", index_col = 0)
    
    #Load the Income scaler. This describes how much each household spends depending on their income.

    Income_scaling = pd.read_csv("Data/mean_expenditure_by_quint.csv", index_col = 0)
    
    ##################################################################################################################
    #Determine Emissions for all years
    ################Question 2##########################################
    year = input_data['year'] #TODO is this supposed to be an input?
    policy_year = input_data['policy_year'] #USER_INPUT
    Region = input_data['region'] #User_input
    policy_label = policy  #This is just a label for the policy
    #########Question 3#########################################
    country = input_data['country']  #This is to choose the country - USER_INPUT
    ab = input_data['ab']            #This is to identify the country, should match above
    ####################################################################

    #######Question 4#################################################
    U_type = input_data['U_type'] #'average', 'town', 'city', 'rural' , This is to select the demand vector - the user should choose
    #################################################################




    #Forming data for the calculations

    #These are needed for holding the results
    DF = pd.DataFrame(np.zeros((30,8)),index = list(range(2020,2050))
                                                          , columns = IW_sectors.columns)  #Holds final data in sectors 7 (+ sum)

    DF_tot = pd.DataFrame(np.zeros((30,200)),index = list(range(2020,2050))
                                                          ,columns = products) #holds final data in products (200)


    direct_ab = "direct_"+ab
    indirect_ab = "indirect_"+ab
    M_countries.loc[direct_ab:indirect_ab,:].copy()

    #TODO this had a dynamically assigned variable that had to be changed, the second variable
    #  is still here until certain that it's not needed.
    ab_M = DE_M = M_countries.loc[direct_ab:indirect_ab,:].copy()  #Here the emission intensities                                                 
                                                                                   #are selected

    #Extract 
    ab_Y = Y_city[country].copy()  ##Here the demand vector is selected
    #for index, val in ab_Y.iteritems(): #TODO remove testing lines
    #    print(index, val)


    #These are needed for the use phase emissions

    Tail_pipe_ab = Tail_pipe[country].copy()
    Use_phase_ab = Use_phase[country].copy()

    #This is needed for calculating the amount of electricity coming from heating

    ad = Adjustable_amounts[country].copy()
    elec_price = Electricity_prices[country]["BP_2019_S2_Euro"] 

    #Baseline Modifications go here
    #############Question 5#########################################################
    #House_size

    House_size_ab = House_size.loc['Average_size_'+ U_type, country] #This is the default
    #House_size_ab = 2.14#xx###USER_INPUT
    ################################################################################

    ############Question 6############################################################
    #Population_size

    pop_size = input_data['pop_size'] #USER_INPUT
    if policy_label == "BL":
        pop_sizeBL = pop_size
    #####################################################################################

    ###########Question 7################################################################
    #Income_scaler

    Income_scaler = input_data['income_scaler']   #USER_INPUT#This is the default and should be used if the user doesn't know the income type
    Elasticity = 1 


    #Otherwise,  the user selects the income level of the household (they choose by quntiles)

    #Income_scaler = Income_scaling.loc['1st_household',country] / Income_scaling.loc['Total_household',country] #USER_INPUT
    #Elasticity = 1 # Random number for now. It should be specific to country and product

    ab_Y *= Income_scaler * Elasticity
    ##############################################################################################

    ##This is the end of the mandatory questions


    ##Optional questions
    #################################################################################################
    #Here the user can modify the default values for the the demand. IF THEY DON'T WANT TO THEN SKIP THIS PART.


    #########Question 8#############################################################################
        #Public Transport types

    public_transport = ['Railway transportation services', 'Other land transportation services', 
                        'Sea and coastal water transportation services', 'Inland water transportation services']


    Public_transport_sum = ab_Y[public_transport].sum()    ###This describes the total use of public transport

    #These 'prop' values can be adjustable by the user. 
    #For example, if the user thinks there should be no water based travel this can be set to 0
    #but then the other values should be increased so that total proportions sum to equal to 1

    #In such a case, the code to do this would be

    try:
        river_prop = input_data['river_prop'] # maintaining correct ratio should be done in front-end
        ferry_prop = input_data['ferry_prop']
        bus_prop = input_data['bus_prop']
        rail_prop = input_data['rail_prop']
    except Exception as e:
        logging.debug(f'river/ferry/bus or rail_prop was missing. {e}')
        rail_prop = ab_Y['Railway transportation services'] / Public_transport_sum
        bus_prop = ab_Y['Other land transportation services'] / Public_transport_sum
        ferry_prop = ab_Y['Sea and coastal water transportation services'] / Public_transport_sum
        river_prop = ab_Y['Inland water transportation services'] / Public_transport_sum
    
    #TODO these calculations make no sense when the old variable is written over. Look at rail_prop
    #river_prop = 0#USER_INPUT (often 0)
    #ferry_prop = 0#USER_INPUT (often 0)
    #bus_prop = bus_prop / (bus_prop + rail_prop) #USER_INPUT - code maintains the ratio between bus and rail
    #rail_prop = rail_prop / (bus_prop + rail_prop) #USER_INPUT - code maintains the ratio between bus and rail

    if policy_label == "BL" or policy_label == "RF":
        ferry_prop = ferry_prop / (bus_prop + ferry_prop+ rail_prop)

    #The values that should be adjusted are:

    ab_Y['Railway transportation services'] = rail_prop * Public_transport_sum
    ab_Y['Other land transportation services'] = bus_prop * Public_transport_sum
    ab_Y['Sea and coastal water transportation services'] = ferry_prop * Public_transport_sum
    ab_Y['Inland water transportation services'] = river_prop * Public_transport_sum

    ##############################################################################

    #Otherwise, if there is no rail travel or river/sea travel then it should be:

    #rail_prop = 0
    #river_prop = 0
    #ferry_prop = 0
    #bus_prop = 1

    ######################################################################################################


    #########Question 9##################################################################################
        #Electricity _ mix
    #IT SHOULD BE SUGGESTED TO LEAVE THE DEFAULT VALUES 
    #As above, the user can specify if the electricity mix is different to the country average for the BL

    electricity = ['Electricity by coal', 'Electricity by gas','Electricity by nuclear',
                          'Electricity by hydro', 'Electricity by wind','Electricity by petroleum and other oil derivatives',
                          'Electricity by biomass and waste', 'Electricity by solar photovoltaic',
                          'Electricity by solar thermal', 'Electricity by tide, wave, ocean',
                          'Electricity by Geothermal', 'Electricity nec'] 

    #No electricity goes in 'electricity nec'. This is used for local electricity production

    elec_total = ab_Y[electricity].sum()

    #The code works the same as above the the public transport. 

    #e.g.

    #hydro_prop = 0.7
    #solar_pvc_prop = 0.3
    #coal_prop = 0
    #gas_prop = 0
    #nuclear_prop = 0
    #wind_prop = 0
    #petrol_prop = 0
    #solar_thermal_prop = 0
    #tide_prop = 0
    #geo_prop = 0
    #nec_prop = 0

    #Then the total kWh is determined from these props
    #ab_Y[electricity] = 0

    #ab_Y['Electricity by solar photovoltaic'] = solar_pvc_prop * elec_total
    #ab_Y['Electricity by hydro'] = hydro_prop * elec_total


    #if the user specifies the mix, then the electricity values change to the LCA values:

    #for elec in electricity:

        #ab_M.loc[direct_ab:indirect_ab,electricity] = M_countries_LCA.loc[direct_ab:indirect_ab,electricity] 

    #IT SHOULD BE SUGGESTED THAT THE USER DOES NOT ALTER THE ELECTRICITY MIX
    ################################################################################################################

    #######Question 10#####################################################################################


        #Supply of household heating

    liquids = ['Natural Gas Liquids', 'Kerosene', 'Heavy Fuel Oil', 'Other Liquid Biofuels']
    solids = ['Wood and products of wood and cork (except furniture); articles of straw and plaiting materials (20)',
                      'Coke Oven Coke']
    gases = ['Distribution services of gaseous fuels through mains', 'Biogas']
    district = 'Steam and hot water supply services'
    electricity_heat = (ad["elec_water"] +ad["elec_heat"] + ad["elec_cool"]) * elec_total * elec_price
    Total_Fuel = ab_Y[solids].sum() + ab_Y[liquids].sum() + ab_Y[gases].sum() + ab_Y[district].sum() + electricity_heat

    #We assume all 'fuels' are the same efficiency (obviously wrong, but no time to fix)

    #########################
    #PART 1 - The user selects the heating proportions from district heating, electricity and household combustion
    #########################


    #Default values are given by:
    district_prop = ab_Y[district] / Total_Fuel
    electricity_heat_prop = electricity_heat / Total_Fuel
    combustable_fuels_prop = (ab_Y[solids].sum() + ab_Y[liquids].sum() + ab_Y[gases].sum()) / Total_Fuel

    ###THE USER CAN ALTER THESE BY::

    #THESE NUMBERS NEED TO SUM TO 1
    #district_prop = 0.0#district_prop#1##USER_INPUT
    #electricity_heat_prop = 1.0#electricity_heat_prop##USER_INPUT
    #combustable_fuels_prop = 0.0#combustable_fuels_prop##USER_INPUT

    ######################################
    ##Part 2 - Determine final values
    ######################################

    #Then, the final values are given by:

    #DISTRICT HEATING
    ab_Y[district] = Total_Fuel * district_prop

    #ELECTRICITY
    for elec in electricity:
        prop = ab_Y[elec] / elec_total #determine amount of each electricity source in total electricity mix.
        elec_hold = (1 - (ad["elec_water"] +ad["elec_heat"] + ad["elec_cool"])) * ab_Y[elec] #electricity for appliances
        ab_Y[elec] = prop * electricity_heat_prop * Total_Fuel / elec_price #Scale based on electricity use in heat and elec mix
        ab_Y[elec] += elec_hold #Add on the parts to do with appliances


    #COMBUSTABLE FUELS

    #Here, the user can also alter the mix of the combustable fuels.

    try:
        liquids_prop = input_data['liquids_prop']
        solids_prop = input_data['solids_prop']
        gases_prop = input_data['gases_prop']
    except:
        liquids_prop = ab_Y[liquids].sum()/ (ab_Y[liquids].sum() + ab_Y[solids].sum() + ab_Y[gases].sum())
        solids_prop = ab_Y[solids].sum()/ (ab_Y[liquids].sum() + ab_Y[solids].sum() + ab_Y[gases].sum())
        gases_prop = ab_Y[gases].sum()/ (ab_Y[liquids].sum() + ab_Y[solids].sum() + ab_Y[gases].sum())
    #THE USER CAN CHANGE THESE VALUES BUT THE SUM MUST BE EQUAL TO 1!

    ############Question 10.1######################
    #liquids_prop = 0 # #USER INPUT
    #solids_prop = 0 ##USER_INPUT
    #gases_prop = 1 # #USER_INPUT


    #Then

    for liquid in liquids:
        if ab_Y[liquids].sum() != 0:
            prop = ab_Y[liquid] / ab_Y[liquids].sum()  #Amount of each liquid in total liquid expenditure
            ab_Y[liquid] = prop * liquids_prop * combustable_fuels_prop * Total_Fuel
        else:
            ab_Y['Kerosene'] = liquids_prop * combustable_fuels_prop * Total_Fuel

    for solid in solids:
        if ab_Y[solids].sum() != 0:
            prop = ab_Y[solid] / ab_Y[solids].sum()  #Amount of each solid in total solid expenditure
            ab_Y[solid] = prop * solids_prop * combustable_fuels_prop * Total_Fuel
        else:
            ab_Y['Wood and products of wood and cork (except furniture); articles of straw and plaiting materials (20)'] = solids_prop * combustable_fuels_prop * Total_Fuel

    for gas in gases:
        if ab_Y[gases].sum() != 0:
            prop = ab_Y[gas] / ab_Y[gases].sum()  #Amount of each gas in total gas expenditure
            ab_Y[gas] = prop * gases_prop * combustable_fuels_prop * Total_Fuel
        else:
            ab_Y['Distribution services of gaseous fuels through mains'] = gases_prop * combustable_fuels_prop * Total_Fuel

    ######QUESTION 11###########################################
        #The 'direct_ab' value should be changed to the value the user wants. 
        #The user needs to convert the value into kg CO2e / Euro 
    if (policy_label == "BL"):
        direct_district_emissions = ab_M.loc[direct_ab,district]#1.0475#USER_INPUT
        ab_M.loc[direct_ab,district] = direct_district_emissions
    ################################################################


    ######### Question 12########################################
    #This is the expected global reduction in product emissions
    eff_scaling = input_data['EFF_scaling'] #USER_INPUT
    ##############################################################


    ###############################################################
    #############The actual calculation starts here################
    #################################################################


    income_scaling = Income_proj.loc[country]    #Scale factor applied to income - unique value for each decade
    house_scaling = House_proj.loc[country]      #Scale factor applied to household size - unique value for each decade

    while year <= 2050:
        #check the policy part
        if year == 2020:
            income_mult = 1 #This is just for the year 2020
            house_mult = 1  #This is just for the year 2020
            eff_factor = 1  #This is just for the year 2020

    ###########Policies are from here################################################################
        if year == policy_year:
            ###########################################
    #     NEW PART FOR THE CONSTRUCTION EMISSIONS!
    #######################################################       
    ##Construction emissions#############################################################################################

    ##This is what the user enters for answering the construction question in the policy tab        
	##New floor area per person
            New_floor_area = input_data['new_floor_area']   #USER_INPUT
    #    END OF PART FOR THE CONSTRUCTION EMISSIONS!    

    ###############################################################################################################

            #Questions should be asked in this order! Some depend on the results of others
    ##############Household Efficiency###################################################        
            EFF_gain = input_data['EFF_gain'] #USER_INPUT
            EFF_scaler = input_data['EFF_scaler'] #USER_INPUT

            if EFF_gain:
                Eff_improvements(ab_Y, EFF_scaler, liquids, solids, gases, electricity, ad, district)

    ########################################################################################################################

    ##############Local_Electricity########################################################################################

            EL_Type = input_data['EL_Type'] #'Electricity by solar photovoltaic'#USER_INPUT #'Electricity by solar photovoltaic','Electricity by biomass and waste','Electricity by wind','Electricity by Geothermal'  
            EL_scaler = input_data['EL_scaler']

            if input_data['local_electricity']:
                ab_Y, ab_M = Local_generation(ab_M,ab_Y, EL_scaler, EL_Type, electricity, M_countries_LCA, direct_ab, indirect_ab)

    #########################################################################################################################

    ##############Sustainable_Heating######################################################################################

            S_heating = input_data['s_heating'] #USER_INPUT
            district_prop = input_data['district_prop'] #USER_INPUT
            Electricity_prop = input_data['electricity_prop'] #USER_INPUT
            combustable_fuels_prop = input_data['combustable_fuels_prop'] #USER_INPUT
            solids_prop = input_data['solids_prop'] #USER_INPUT
            gases_prop = input_data['gases_prop'] #USER_INPUT
            liquids_prop = input_data['liquids_prop'] #USER_INPUT
            
            #district_prop = 0.25 #USER_INPUT
            #Electricity_prop = 0.75 #USER_INPUT
            #combustable_fuels_prop = 0.25 #USER_INPUT
            #solids_prop = 0.0 #USER_INPUT
            #gases_prop = 0.0 #USER_INPUT
            #liquids_prop = 0.0 #USER_INPUT
            District_value = ab_M.loc[direct_ab,district].sum()# ab_M   0.0 # USER_INPUT

            if S_heating:
                ab_M, ab_Y = local_heating(district, Total_Fuel, electricity, elec_total, direct_ab, ad, electricity_heat_prop, elec_price, liquids, solids, gases, ab_M, ab_Y, district_prop, Electricity_prop, 
                              combustable_fuels_prop, liquids_prop, gases_prop, solids_prop, District_value)
                #This is just a repeat of the baseline part

    #########################################################################################################################

    ###########Biofuel_in_transport########################################################################################
            Biofuel_takeup = input_data['biofuel_takeup'] #USER_INPUT
            bio_scaler = input_data['bio_scaler'] #USER_INPUT

            if Biofuel_takeup:
                BioFuels(ab_Y, bio_scaler)

    ##########################################################################################################################

    ########Electric_Vehicles##################################################################################################
            EV_takeup = input_data['EV_takeup'] #USER_INPUT
            EV_scaler = 0.5

            if EV_takeup:
                Electric_Vehicles(ab_Y, EV_scaler, Fuel_prices, country, electricity)

    ############################################################################################################################

    #########Modal_Shift#######################################################################################################
            Modal_Shift = input_data['Modal_Shift'] #USER_INPUT
            MS_fuel_scaler = input_data['MS_fuel_scaler'] #USER_INPUT
            MS_veh_scaler = input_data['MS_veh_scaler'] #USER_INPUT
            MS_pt_scaler = input_data['MS_pt_scaler'] #USER_INPUT

            if Modal_Shift:
                Transport_Modal_Shift(ab_Y, MS_fuel_scaler, MS_pt_scaler, MS_veh_scaler, public_transport)

    ###########################################################################################################################            

        if year > 2020 and year <= 2030:

            income_mult = income_scaling['2020-2030']   #Select the income multiplier for this decade
            house_mult = house_scaling['2020-2030']     #Select the house multiplier for this decade
            eff_factor = eff_scaling

        if  year > 2030 and year <= 2040: 

            income_mult = income_scaling['2030-2040']   #Seclectthe income multiplier for this decade
            house_mult = house_scaling['2030-2040']     #select the house multiplier for this decade
            eff_factor = eff_scaling

        if year > 2040 and year <=2050:

            income_mult = income_scaling['2040-2050']   #Seclectthe income multiplier for this decade
            house_mult = house_scaling['2040-2050']     #select the house multiplier for this decade
            eff_factor = eff_scaling

        ab_Y *= income_mult
        ab_M *=eff_factor
        Use_phase_ab *=eff_factor
        Tail_pipe_ab *=eff_factor

        #Then we have to recalculate
        GWP_ab = pd.DataFrame(ab_M.to_numpy().dot(np.diag(ab_Y.to_numpy()))) # This is the basic calculation
        GWP_ab.index = ['direct' , 'indirect']
        GWP_ab.columns = products
        Use_phase_ab_GWP = ab_Y * Use_phase_ab # This adds in the household heating fuel use
        Tail_pipe_ab_GWP = ab_Y * Tail_pipe_ab # This adds in the burning of fuel for cars
        Total_use_ab = Tail_pipe_ab_GWP.fillna(0) + Use_phase_ab_GWP.fillna(0) #This puts together in the same table (200 x 1)
                                                                               #all of the other 200 products are zero
        #Put together the IO and use phase
        GWP_ab.loc['Use phase',:] = Total_use_ab
        #GWP_EE_pc = GWP_EE/House_size_EE
        #GWP_EE = GWP_EE * (eff_factor) * (income_mult)
        GWP_ab_pc = GWP_ab / (House_size_ab * house_mult)   

    #Put the results into sectors  
        DF.loc[year] =IW_sectors_np_tr.dot(GWP_ab_pc.sum().to_numpy())
        DF_tot.loc[year] = GWP_ab_pc.sum()
        year +=1

    DF['Total_Emissions'] = DF.sum(axis = 1)

    ###########################################################################################################
    #New Construction Emissions part!
    #################################################################################################################
    if country in North:
        Building_Emissions = 350 * New_floor_area/pop_size
    if country in West:
        Building_Emissions = 520 * New_floor_area/pop_size
    if country in East:
        Building_Emissions = 580 * New_floor_area/pop_size
    DF.loc[policy_year, 'Total_Emissions'] += Building_Emissions


    ##############################################################################################################
    #End of Construction Emissions part!
    #############################################################################################################

    return DF, DF_tot
    #F_tot.columns = Exio_products
    #locals()[Region + "_Emissions_" + policy_label] = DF
    #locals()[Region+ "_Emissions_tot_" + policy_label] = DF_tot


def BioFuels(ab_Y,scaler):
    """        ##Explanation/Description
        This sort of policy acts only on the Expenditure (Intensities don't change)
        Similar polices could exist for houseing fuel types, ...
        Similar adjustments to this could also be needed to correct the baselines if the user knows the 
        results to be different"""
    
    ## Step 1. Determine current expenditure on fuels and the proportions of each type
    
    Total_fuel = ab_Y['Biogasoline'] + ab_Y['Biodiesels'] + ab_Y['Motor Gasoline'] + ab_Y['Gas/Diesel Oil']
    Diesel = (ab_Y['Biodiesels'] + ab_Y['Gas/Diesel Oil'])
    Petrol = (ab_Y['Motor Gasoline'] + ab_Y['Biogasoline'])
        
        #Step 2. Increase the biofuel to the designated amount
        
    ab_Y['Biogasoline'] = scaler * Total_fuel * (Petrol/ (Diesel + Petrol))
    ab_Y['Biodiesels'] =  scaler * Total_fuel * (Diesel / (Diesel + Petrol))
        
                #Step 3. Decrease the others by the correct amount, taking into account their initial values
        
        #The formula to do this is :
        #New Value = Remaining_expenditure * Old_proportion (once the previous categories are removed)
        
    Sum_changed = ab_Y['Biogasoline'] + ab_Y['Biodiesels'] #This can't be more than the total!
        
    ab_Y['Motor Gasoline'] = (Total_fuel - Sum_changed) * (Petrol / (Diesel + Petrol))
    ab_Y['Gas/Diesel Oil'] = (Total_fuel - Sum_changed) * (Diesel / (Diesel + Petrol))
    
def Electric_Vehicles(ab_Y, scaler, Fuel_prices, country, electricity):
    """
                 ##Policy explanation
        xx% of vehicles are ev
        First we reduce the expenditure on all forms of transport fuels by 20 %
        Then, we need to add something onto the electricity
        
        For this we need to: calculate how much fuel is saved and convert it back into Litres (and then kwh)
        Take into account the difference in efficiency between the two types
        Add the Kwh evenly onto the electricity sectors
        
        Explanation/Description
        This sort of policy acts only on the Expenditure 
    """
        
    #step 1 Assign a proportion of the fuels to be converted and reduce the fuels by the correct amount 
    Diesel = (ab_Y['Biodiesels'] + ab_Y['Gas/Diesel Oil'])*scaler
    Petrol = (ab_Y['Motor Gasoline'] + ab_Y['Biogasoline'])*scaler
    Fuels = ['Biodiesels', 'Gas/Diesel Oil', 'Motor Gasoline', 'Biogasoline']
        
    for fuel in Fuels:
        ab_Y[fuel] = ab_Y[fuel]*(1-scaler)
        
    #step 2 Turn the amount missing into kwh
    Diesel /= Fuel_prices.loc['Diesel_2020', country]
    Petrol /= Fuel_prices.loc['petrol_2020', country]
    Diesel *= 38.6*0.278   #litres, then Kwh
    Petrol *= 34.2*0.278   #litres, then kwh
        
    #step 3. #Divide that amount by 4.54 (to account foe the efficiency gains)
    Diesel /= 4.54         #Efficiency saving
    Petrol /=4.54          #Efficiency saving
        
    #step 4. Assign this to increased electricity demand
    Elec_vehicles = Diesel + Petrol       
    elec_total = ab_Y[electricity].sum()
    elec_scaler = (Elec_vehicles + elec_total) / elec_total
    ab_Y[electricity] *= elec_scaler
      
        #Proportions MUST always sum to 1!!!!!!!!!!!

def Eff_improvements(ab_Y, scaler, liquids, solids, gases, electricity, ad, district):
    """
    Policy Explanation
    Retrofitting reduces energy expenditure on heating by xx %
        
    This sort of policy acts only on the Expenditure (Intensities don't change)
    Take the expenditure on household fuels and reduce it by a scale factor defined by the user
    """
    
        #Step 1. This can be done as a single stage. 
        #Just reduce the parts that can be reduced by the amount in the scaler
            
    for liquid in liquids:    
        ab_Y[liquid] = (ab_Y[liquid]*(1-scaler))
            
    for solid in solids:
        ab_Y[solid] = (ab_Y[solid]*(1-scaler))
        
    for gas in gases:
        ab_Y[gas] = (ab_Y[gas]*(1-scaler)) 
                                                            
    for elec in electricity:
        elec_hold = ab_Y[elec] * (1-(ad["elec_water"] +ad["elec_heat"] + ad["elec_cool"]))  #Parts not related to heating/cooling etc
        ab_Y[elec] = (ab_Y[elec]*(ad["elec_water"] +ad["elec_heat"] + ad["elec_cool"])*(1-scaler)) 
        ab_Y[elec] +=elec_hold
            
    ab_Y[district] = ab_Y[district]*(1-scaler)                                        
        #Proportions MUST always sum to 1!!!!!!!!!!!
        
def Transport_Modal_Shift(ab_Y,scaler, scaler_2, scaler_3, public_transport):
    """
    Policy explanation
    Modal share - decrease in private transport and increase in public transport
        
    This sort of policy acts only on the Expenditure (Intensities don't change)
    The expenditure on private transport is reduced by a certain amount (1 part for fuels and 1 for vehicles)
    
    The public transport is also increased by a different amount. This is to account for the effects of active travel
    """
    
    Fuels = ['Biodiesels', 'Gas/Diesel Oil', 'Motor Gasoline', 'Biogasoline']
        
    for fuel in Fuels:
        ab_Y[fuel] *= (1-scaler)
        #In this case, we also assume that there is a reduction on the amount spent on vehicles
        #Change in modal shift takes vehicles off the road?
    Vehicles = ['Motor vehicles, trailers and semi-trailers (34)', 
                   'Sale, maintenance, repair of motor vehicles, motor vehicles parts, motorcycles, motor cycles parts and accessoiries']
        
    for vehicle in Vehicles:    
        ab_Y[vehicle] *=(1-scaler_3)
        
    for transport in public_transport:  #Public transport was defined above
        ab_Y[transport] *=(1+scaler_2)
        
        #Proportions MUST always sum to 1!!!!!!!!!!!
        
def Local_generation(ab_M, ab_Y, scaler, type_electricity, electricity, M_countries_LCA, direct_ab, indirect_ab):
    """
    ##Policy explanation
        Local electricity is produced by (usually) rooftop solar and it utilised only in that area
        
        #Reduce current electricity by xx %
        #Introduce a new electricity emission intensity (based on PV in the LCA emission intensities) 
        ##that accounts for the missing xx %
    """
    #print(ab_Y.columns)
    elec_total = ab_Y[electricity].sum()
    
    for elec in electricity:        
        ab_Y[elec] = (ab_Y[elec] * (1 - scaler))
        
    #Assign the remaning amount to the spare category (electricity nec)
    
    ab_Y['Electricity nec'] = elec_total * scaler
    
    #Set the emission intensity of this based on LCA values
    
    ab_M.loc[direct_ab:indirect_ab,'Electricity nec'] = M_countries_LCA.loc[direct_ab:indirect_ab,type_electricity]
    return ab_Y, ab_M
    
def local_heating(district, Total_Fuel, electricity, elec_total, direct_ab, ad, electricity_heat_prop, elec_price, liquids, solids, gases, ab_M, ab_Y, district_prop, elec_heat_prop, combustable_fuels_prop, liquids_prop, gases_prop, solids_prop, district_val):
    """
    THIS JUST REPEATS BASELINE QUESTIONS 9 - 10.
    ALLOWING THE USER TO CHANGE THE VALUES
    """

    #DISTRICT HEATING
    ab_Y[district] = Total_Fuel * district_prop

    #ELECTRICITY
    for elec in electricity:
        prop = ab_Y[elec] / elec_total #determine amount of each electricity source in total electricity mix.
        elec_hold = (1 - (ad["elec_water"] +ad["elec_heat"] + ad["elec_cool"])) * ab_Y[elec] #electricity for appliances
        ab_Y[elec] = prop * electricity_heat_prop * Total_Fuel / elec_price #Scale based on electricity use in heat and elec mix
        ab_Y[elec] += elec_hold #Add on the parts to do with appliances
    
    for liquid in liquids:
        if ab_Y[liquids].sum() != 0:
            prop = ab_Y[liquid] / ab_Y[liquids].sum()  #Amount of each liquid in total liquid expenditure
            ab_Y[liquid] = prop * liquids_prop * combustable_fuels_prop * Total_Fuel
        else:
            ab_Y['Kerosene'] = liquids_prop * combustable_fuels_prop * Total_Fuel
        
    for solid in solids:
        if ab_Y[solids].sum() != 0:
            prop = ab_Y[solid] / ab_Y[solids].sum()  #Amount of each solid in total solid expenditure
            ab_Y[solid] = prop * solids_prop * combustable_fuels_prop * Total_Fuel
        else:
            ab_Y['Wood and products of wood and cork (except furniture); articles of straw and plaiting materials (20)'] = solids_prop * combustable_fuels_prop * Total_Fuel

    for gas in gases:
        if ab_Y[gases].sum() != 0:
            prop = ab_Y[gas] / ab_Y[gases].sum()  #Amount of each gas in total gas expenditure
            ab_Y[gas] = prop * gases_prop * combustable_fuels_prop * Total_Fuel
        else:
            ab_Y['Distribution services of gaseous fuels through mains'] = gases_prop * combustable_fuels_prop * Total_Fuel

    #The 'direct_ab' value should be changed to the value the user wants. 
    #The user needs to convert the value into kg CO2e / Euro 
    ab_M.loc[direct_ab,district] = district_val ####1.0475#USER_INPUT
    return ab_M, ab_Y
    ################################################################

def main():
    project_root = pathlib.Path(__file__).parent.resolve()
    os.chdir(project_root)
    level = logging.DEBUG
    fmt = '[%(levelname)s] %(asctime)s - %(message)s'
    logging.basicConfig(level=level, format=fmt)
    
    logging.debug(f'Argument List: {str(sys.argv)}')
    #for testing purposes

    # input_data = json.loads('{"year": 2020, "region": "Berlin", \
    #     "policy_label":["BL", "RF", "NA"], "country": "Germany", "ab": "DE", \
    #     "target_area":"some_val", "U_type":"city", \
    #     "pop_size":10000, "house_size":100, "income_level":"100", \
    #     "EFF_scaling":0.97, "river_prop":0.0, "ferry_prop":0.0, \
    #     "rail_prop":0.0, "bus_prop":1.0, "hydro_prop":0.50, \
    #     "solar_pvc_prop":0.05, "coal_prop":0.05, "gas_prop":0.05, \
    #     "nuclear_prop":0.05, "wind_prop":0.05, "petrol_prop":0.05, \
    #     "solar_thermal_prop":0.05, "tide_prop":0.05, "geo_prop":0.05, \
    #     "nec_prop":0.05, "district_prop":0.25, "electricity_heat_prop":0.25, \
    #     "combustable_fuels_prop":0.25, "liquids_prop":0.3, "solids_prop":0.3, \
    #     "gases_prop":0.4, "direct_district_emissions":0.5, \
    #     "policy_year":2025, "EFF_gain":"true", "EFF_scaler":0.5, \
    #     "local_electricity":false, "EL_Type":"Electricity by solar photovoltaic", "EL_scaler":0.5, \
    #     "s_heating":false, "biofuel_takeup":true, "bio_scaler":0.5, \
    #     "EV_takeup":true, "EV_scaler":0.5, "Modal_Shift":false, \
    #     "MS_fuel_scaler":0.5, "MS_pt_scaler":0.2, "MS_veh_scaler":0.5, \
    #     "new_floor_area":0, "income_scaler":1, "electricity_prop":0.75, \
    #     "partially_new_area":true}')
    input_data=json.loads(sys.argv[1])
    emissions = calculations_wrapper(input_data)
    print(emissions.to_json())
    #sys.stdout.flush()

if __name__ == "__main__":
    start = time.perf_counter()
    main()
    end = time.perf_counter()
    logging.info(f"runtime: {end - start}")
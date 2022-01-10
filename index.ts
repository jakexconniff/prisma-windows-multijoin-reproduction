// Import required libraries
import { PrismaClient } from '@prisma/client'
const randomString = require('randomstring')
const dayjs = require('dayjs')

// Create prisma client
const prisma = new PrismaClient()

const createMockFacilityData = (): object => {
  const dataObject = {
    cancellation_allowed_by_customer: Math.random() < 0.5,
    cancellation_allowed_by_spothero_customer_service: Math.random() < 0.5,
    cancellation_minutes: Math.floor((Math.random() * 121)),
    clearance_inches: Math.floor((Math.random() * 8) + 17),
    description: randomString.generate(Math.floor((Math.random() * 4) + 64)),
    facility_type: randomString.generate(Math.floor((Math.random() * 4) + 64)),
    always_open: Math.random() < 0.5,
    hours_of_operation_text: randomString.generate(Math.floor((Math.random() * 4) + 64)),
    navigation_tip: randomString.generate(Math.floor((Math.random() * 4) + 64)),
    rating_average: Math.floor((Math.random() * 1) + 11),
    rating_count: Math.floor((Math.random() * 1) + 101),
    required_license_plate: Math.random() < 0.5,
    required_phone_number: Math.random() < 0.5,
    required_printout: Math.random() < 0.5,
    reservation_extension_enabled: Math.random() < 0.5,
    slug: randomString.generate(Math.floor((Math.random() * 4) + 64)),
    title: randomString.generate(Math.floor((Math.random() * 4) + 128)),
    status: randomString.generate(Math.floor((Math.random() * 4) + 64)),
    is_commuter_card_eligible: Math.random() < 0.5
  }

  return dataObject
}

// Returns mock facility address data based on facility_id
const createMockFacilityAddressData = (fId: Number): Object => {
  const americanTimeZones: Array<String> = ['EST', 'CST', 'MST', 'PST', 'AKST', 'HST']
  const streetNumber: Number = Math.floor((Math.random() * 5000) + 1)
  const streetName: String = randomString.generate(Math.floor((Math.random() * 4) + 16))
  const dataObject: Object = {
    facility_id: fId,
    city: randomString.generate(Math.floor((Math.random() * 4) + 32)),
    state: randomString.generate(2),
    postal_code: Math.floor((Math.random() * 999999) + 10000),
    street_address: `${streetNumber} ${streetName} Ave.`,
    lat: parseFloat((Math.floor((Math.random()* 11) + 1)).toString() + '.' + (Math.floor((Math.random() * 10000) + 99999)).toString()),
    long: parseFloat((Math.floor((Math.random() * 11) + 1)).toString() + '.' + (Math.floor((Math.random() * 10000) + 99999)).toString()),
    time_zone: americanTimeZones[Math.floor(Math.random() * 6)],
    country: randomString.generate(Math.floor((Math.random() * 8) + 32))
  }

  return dataObject
}

const createMockFacilityAddressTypes = (fId: Number): Object => {
  const dataObject: Object = {
    facility_address_id: fId,
    type: randomString.generate(Math.floor((Math.random() * 64) + 4))
  }
  return dataObject
}

// Returns mock facility operation data based on facility_id
const createMockFacilityOperationData = (fId: Number): Object => {
  const days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dataObject = {
    facility_id: fId,
    day_of_week: days_of_week[Math.floor(Math.random() * 7)],
    end_time: dayjs().toISOString(),
    end_time_secs: dayjs().second(),
    first_day: days_of_week[Math.floor(Math.random() * 7)],
    hours_type: randomString.generate(Math.floor((Math.random() * 16) + 4)),
    last_day: days_of_week[Math.floor(Math.random() * 7)],
    start_time: dayjs().toISOString(),
    start_time_secs: dayjs().second()
  }
  return dataObject
}

// Returns mock pull data
const createMockPullData = (): Object => {
  const dataObject = {
    lat: parseFloat((Math.floor((Math.random()* 11) + 1)).toString() + '.' + (Math.floor((Math.random() * 10000) + 99999)).toString()),
    long: parseFloat((Math.floor((Math.random() * 11) + 1)).toString() + '.' + (Math.floor((Math.random() * 10000) + 99999)).toString()),
  }

  return dataObject
}

// Returns mock results data
const createMockResultsData = (pId: Number, fId: Number): Object => {
  const dataObject = {
    pull_id: pId,
    facility_id: fId
  }
  return dataObject
}

// Returns mock result rate quotes data
const createMockResultRateQuotes = (resultId: Number): Object => {
  const dataObject = {
    results_id: resultId,
    advertised_price: Math.floor((Math.random() * 100) + 1),
    total_price: Math.floor((Math.random() * 100) + 1),
  }

  return dataObject
}

const getAllFacilities = async () => {
  const results: Array<any> = await prisma.facilities.findMany()
  return results
}

// Returns all facility address records
const getAllFacilityAddresses = async () => {
  const results: Array<any> = await prisma.facility_addresses.findMany()
  return results
}

// Returns all pull records
const getAllPulls = async () => {
  const results: Array<any> = await prisma.pull.findMany()
  return results
}

// Returns all pull records
const getAllResults = async () => {
  const results: Array<any> = await prisma.results.findMany()
  return results
}

const postMockFacilities = async (x: any) => {
  let mockFacilityData: Array<any> = Array.from(Array(x).keys()).map(x => createMockFacilityData()) // Creates 1000 random mock facility objects
  await prisma.facilities.createMany({
    data: mockFacilityData,
    skipDuplicates: true
  })
}

// Generates mock facility addresses and pushes data to facility_addresses table
const postMockFacilitiesAddresses = async (facilityRecords: any) => {
  const mockFacilitiesAddressData: Array<any> = facilityRecords.map((x: any) => createMockFacilityAddressData(x.id))
  
  await prisma.facility_addresses.createMany({
    data: mockFacilitiesAddressData,
    skipDuplicates: true
  })
}

// Generates mock facility addresses and pushes data to facility_addresses table
const postMockFacilitiesAddressTypes = async (facilityAddressRecords: any) => {
  const mockFacilitiesAddressTypeData: Array<any> = facilityAddressRecords.map((x: any) => createMockFacilityAddressTypes(x.id))
  await prisma.facility_address_types.createMany({
    data: mockFacilitiesAddressTypeData,
    skipDuplicates: true
  })
}

// Generates mock facility hours of operation periods and pushes data to facility_hours_of_operation_periods table
const postMockFacilityOperationData = async (facilityRecords: any) => {
  const mockFacilityOperationData: Array<any> = facilityRecords.map((x: any) => createMockFacilityOperationData(x.id))

  await prisma.facility_hours_of_operation_periods.createMany({
    data: mockFacilityOperationData,
    skipDuplicates: true
  })
}

// Generates mock pull data and pushes data to pull table
const postMockPullData = async (x: any) => {
  let mockPullData: Array<any> = Array.from(Array(x).keys()).map(x => createMockPullData()) // Creates 1000 random mock pull objects
  await prisma.pull.createMany({
    data: mockPullData,
    skipDuplicates: true
  });
}

// Generates mock results data and pushes data to results table
const postMockResultsData = async (facilitiesData: any, pullData: any, iterations: any) => {
  const mockResultsData: Array<any> = Array.from(Array(iterations).keys()).map(x => createMockResultsData(Math.floor((Math.random() * pullData.length) + 1), Math.floor((Math.random() * facilitiesData.length) + 1)))
  
  await prisma.results.createMany({
    data: mockResultsData,
    skipDuplicates: true
  })
}

// Generates mock result rate quotes data and pushes to result_rate_quotes table
const postResultRateQuotes = async (resultsData: any) => {
  const resultRateQuotesData: Array<any> = resultsData.map((x: any) => createMockResultRateQuotes(x.id))
  await prisma.result_rate_quotes.createMany({
    data: resultRateQuotesData,
    skipDuplicates: true
  })
}

// Imports data into MySQL DB
const postAllData = async (iterations: Number) => {
  console.log('Commencing data import')
  await postMockFacilities(iterations)
  const facilitiesData = await getAllFacilities()

  // Create facility addresses
  await postMockFacilitiesAddresses(facilitiesData)
  const facilityAddresses = await getAllFacilityAddresses()

  // Create facility address types
  await postMockFacilitiesAddressTypes(facilityAddresses)

  // Create facility operation records
  await postMockFacilityOperationData(facilitiesData)

  // Create pull data
  await postMockPullData(iterations)
  const pullData = await getAllPulls()

  // Create mock results data
  await postMockResultsData(facilitiesData, pullData, facilitiesData.length)
  const resultsData = await getAllResults()

  // Create result rate quotes records 
  await postResultRateQuotes(resultsData)
  console.log('Data import complete')

}

postAllData(250000);
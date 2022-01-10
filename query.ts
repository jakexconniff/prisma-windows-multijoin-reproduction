import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const queryPulls = async () => {
  const pullArray: Array<any> = await prisma.pull.findMany({
    include: {
      results: {
        include: {
          facilities: {
            include: {
              facility_addresses: {
                include: {
                  facility_address_types: true
                }
              },
              facility_hours_of_operation_periods: true
            }
          },
          result_rate_quotes: true
        }
      },
      time_range: true
    }
  });
  console.log('finished!')
}


queryPulls();
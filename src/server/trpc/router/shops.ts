import { z } from 'zod';
import { procedure, router } from '~/server/trpc/utils';

export default router({
  getAllCitiesDistrictsShops: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.city.findMany({
      include: {
        districts: {
          include: {
            shops: true,
          },
        },
      },
    });
  }),
  getCities: procedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.city.findMany();
    }),
  getDistricts: procedure
    .input(z.object({ cityId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.district.findMany({
        where: {
          cityId: input.cityId,
        },
      });
    }),
  getShops: procedure
    .input(z.object({ districtId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.shop.findMany({
        where: {
          districtId: input.districtId,
        }
      });
    }),
  createCity: procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.city.create({ data: input });
    }),
  createDistrict: procedure
    .input(z.object({ name: z.string(), city: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.district.create({ data: input });
    }),
  createShop: procedure
    .input(z.object({ name: z.string(), district: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.shop.create({ data: input });
    }),
});

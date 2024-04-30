"use server";
import { prisma } from "@/lib/prisma";
import { addressFormSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof addressFormSchema>;

// GET ALL addresses

export const getAddresses = async () => {
  // console.log("YEsssss, tous les giss");

  try {
    const addresses = await prisma.address.findMany({
      orderBy: {
        id: "asc",
      },
    });
    // console.log("ADR adr: ", addresses);

    return addresses;
  } catch (error) {
    return { error };
  }
};

// GET ALL addresses Pages

export const getAddressesPages = async ({
  take = 10,
  skip = 0,
}: {
  take?: number;
  skip?: number;
}) => {
  // console.log("YEsssss, tous les giss");

  try {
    const addresses = await prisma.address.findMany({
      take: take,
      skip: skip,
      /*       include: {
        secteur: true,
      }, */
      orderBy: {
        id: "asc",
      },
    });
    console.log(" addresses: ", addresses);

    return addresses;
  } catch (error) {
    return { error };
  }
};

// GET A SPECIFIC Address
export const getAddress = async (id: string) => {
  try {
    const address = await prisma.address.findUnique({
      where: {
        id: +id,
      },
    });
    return address;
  } catch (error) {
    return { error };
  }
};

// ADD NEW Address
export const addAddress = async (data: Inputs) => {
  const resut = addressFormSchema.safeParse(data);
  if (resut.success) {
    try {
      const address = await prisma.address.create({
        data: {
          street: data.street,
          number: data.number,
          box: data.box ? data.box : "",
          municipality: data.municipality,
          postalCode: data.postalCode,
          city: data.city,
          country: data.country,
          longitude: data.longitude,
          latitude: data.latitude,
        },
      });

      revalidatePath("/addresses");

      return {
        success: true,
        data: address,
      };
    } catch (error) {}
  } else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};

//UPDATE GI
export const updateAddress = async (data: Inputs) => {
  const resut = addressFormSchema.safeParse(data);

  console.log("UPDATE DATA: ", data);
  console.log("UPDATE resut: ", resut);

  try {
    if (resut.success && data.id) {
      const updateAddress = await prisma.address.update({
        where: {
          id: +data.id,
        },
        data: {
          street: data.street,
          number: data.number,
          box: data.box ? data.box : "",
          municipality: data.municipality,
          postalCode: data.postalCode,
          city: data.city,
          country: data.country,
          longitude: " ",
          latitude: " ",
        },
      });

      revalidatePath("/addresses");

      return {
        success: true,
        data: updateAddress,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

//DELETE Address
export const deleteAddress = async (data: any) => {
  // const resut = giFormSchema.safeParse(data);

  // console.log("data:", data);

  try {
    if (data) {
      const deleteAddress = await prisma.address.delete({
        where: {
          id: +data,
        },
      });

      revalidatePath("/addresses");

      return {
        success: true,
        // data: updateUser,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

// GET GEOLOC
export const setGeoLoc = async (data: any) => {
  console.log("DATA", data);

  // https://geocode.maps.co/search?q=152+frans+hals+anderlecht+1070&api_key=662909d16b764219098658gole8341e

  const street = data.street.split(" ").join("+");
  const number = data.number.split(" ").join("+");
  //const box = data.box.split(' ').join('+')
  const municipality = data.municipality.split(" ").join("+");
  const postalCode = data.postalCode.split(" ").join("+");
  const city = data.city.split(" ").join("+");

  const q =
    street + "+" + number + "+" + municipality + "+" + postalCode + "+" + city;
  const url =
    "https://geocode.maps.co/search?q=" +
    q +
    "&api_key=662909d16b764219098658gole8341e";

  //console.log("URL: " + url);

  const res = await fetch(url, {
    method: "POST",
  });
  const data2 = await res.json();
  // console.log(data2[0].lat, data2[0].lon);

  if (!data2[0]?.lat || !data2[0]?.lon) return null;

  try {
    const updateAddress = await prisma.address.update({
      where: {
        id: +data.id,
      },
      data: {
        longitude: data2[0].lon,
        latitude: data2[0].lat,
      },
    });

    revalidatePath("/addresses");

    return {
      success: true,
      // data: updateUser,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

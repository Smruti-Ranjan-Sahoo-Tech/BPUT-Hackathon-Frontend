import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const createCrmApi = createApi({
    reducerPath: "crmApi",
    baseQuery:fetchBaseQuery({baseUrl:'https://api.open-meteo.com/'}),
    endpoints:(builder) =>({
        getCrmData:builder.query({
            query: (likuData)=>`v1/forecast?${likuData}&current_weather=true`
        })
    })
})

export const { useGetCrmDataQuery } = createCrmApi;
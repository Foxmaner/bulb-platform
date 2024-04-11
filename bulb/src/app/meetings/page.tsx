"use client";

import React, { useEffect, useState } from "react";

import PageHeader from "../Components/pageHeader";

import RequestApi from "../utils/request";


export default function MeetingPage() {

    async function fetchData() {
        try {
            const response = await RequestApi.post({
                url: "/history/create"
            });

            console.log(response.status);
            console.log(await response.json());

        } catch (error) {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        }
    }

    return (
        <div className="flex-col w-full bg-white">
            <PageHeader userName="Eskil" />
            <button className="text-black cursor-pointer p-2" onClick={() => fetchData()}>Test</button>
            <div className="">
                <div className="bg-slate-100 text-black flex flex-wrap content-start gap-96 border-2 border-gray-200">
                    <div className="text-black cursor-pointer p-2">Möte</div>
                    <div className="text-black cursor-pointer p-2">Datum</div>
                    <div className="text-black cursor-pointer p-2">
                        Medlemmar
                    </div>
                </div>
                <div className="text-black flex flex-wrap content-start gap-80 p-2">
                    <p>Exempelmöte</p>
                    <p>2024/01/01</p>
                    <p>AL, EB</p>
                </div>
            </div>
        </div>
    );
}

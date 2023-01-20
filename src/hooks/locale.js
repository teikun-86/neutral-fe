import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import enUS from "@/locales/en-US.json";
import idID from "@/locales/id-ID.json";
import jaJP from "@/locales/ja-JP.json";

export const useLocale = () => {
    const { locale } = useRouter();
    const [localeData, setLocaleData] = useState(enUS);

    useEffect(() => {
        switch (locale) {
            case "en":
                setLocaleData(enUS);
                break;
            case "id":
                setLocaleData(idID);
                break;
            case "jp":
                setLocaleData(jaJP);
                break;
            default:
                setLocaleData(idID);
                break;
        }
    }, [locale]);

    const __ = (key = "", replace = null, alt = null) => {
        const keys = key.split(".");
        let value = localeData;

        for (let i = 0; i < keys.length; i++) {
            value = value[keys[i]];
            if (!value) break;
        }

        if (!value) {
            return alt ?? key;
        }

        return replace !== null ? value.replace(/{([^}]+)}/g, (_, key) => replace[key]) : (value ?? alt);
    }

    const localeMap = {
        id: {
            name: "Bahasa Indonesia",
            flag: "ID",
            locale: 'id-ID',
            localeShort: 'id',
        },
        en: {
            name: "English (US)",
            flag: "US",
            locale: 'en-US',
            localeShort: 'en',
        },
        jp: {
            name: "日本語",
            flag: "JP",
            locale: 'ja-JP',
            localeShort: 'jp',
        },
    }

    return { __, locale, localeMap };
}
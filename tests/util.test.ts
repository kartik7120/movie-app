import { it, describe, expect } from "vitest"
import { GetDate, monthArr } from "../lib/util"

describe("covertDataFormat()", () => {
    it.todo("should return a valid string if a date string is specified")
})

describe("GetDate()", () => {
    it("should return null when the date specified is null", () => {
        const date = null;
        const result = GetDate(date);
        expect(result).toBeNull();
    })

    it("should return a valid string when a date string is given as input in a form of MM-DD-YYYY", () => {
        const date = "2014-10-21";
        const result = GetDate(date);
        const d = new Date(date);
        const expectedValue = `${monthArr[d.getMonth()]} ${d.getDay()},${d.getFullYear()}`;
        expect(result).toEqual(`October 21,2014`)
    })
})
import { it, describe, expect } from "vitest"
import { GetDate, monthArr, formatter } from "../lib/util"

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

describe.only("formatter()", () => {
    it('should return number without string notation if number is less than or equal to 999', () => {
        const num1 = 999;
        const num2 = 1000;

        const result1 = formatter(num1);
        const result2 = formatter(num2);

        expect(result1).not.toContain('k');
        expect(result2).toContain('k');
    })
    it('should return values with k notation if value supplied greater equal to 1000', () => {
        const num1 = 1000;
        const num2 = 1235;
        const num3 = 8852;

        const result1 = formatter(num1);
        const result2 = formatter(num2);
        const result3 = formatter(num3);

        expect(result1).toBe('1k');
        expect(result2).toBe('1k');
        expect(result3).toBe('8k');
    })
    it("should throw an error if a negitive number is provided",() => {
        const num1 = -1;
        const num2 = -9852;

        const fn1 = () => {
            formatter(num1);
        }
        
        const fn2 = () => {
            formatter(num2);
        }

        expect(fn1).toThrow();
        expect(fn2).toThrow();
    })
})
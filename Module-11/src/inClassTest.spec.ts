import { describe, expect, test } from "vitest";
import { isIPValid, isNIFValid } from "./inClassTest";

describe("IsIPValid", () => {
  test.each([
    ["127.0.0.1", true],
    ["A.0.0.1", false],
    ["0.0.0.0", true],
    ["-1.-1.0.0", false],
    ["10.98.199.1", true],
    ["10.98.199", false],
    ["10.98.199.1.2", false],
  ])(
    "Should return for IP %s the value %s",
    (value: string, expected: boolean) => {
      expect(isIPValid(value)).toBe(expected);
    }
  );
});

describe("IsNIFValid", () => {
  test.each([
    ["12345678Q", true],
    ["12345678-Q", true],
    ["12345678 Q", true],
    ["12345678_Q", true],
    ["12.345.678 Q", true],
    ["12345678Q", true],
    ["12345678-Q", true],
    ["12345678 Q", true],
    ["12345678_Q", true],
    ["12345678 q", true],
    ["12.345.678 Q", true],
  ])(
    "Should return for NIF %s the value %s",
    (value: string, expected: boolean) => {
      expect(isNIFValid(value)).toBe(expected);
    }
  );
});

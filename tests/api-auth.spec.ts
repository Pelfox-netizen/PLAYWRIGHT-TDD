import { test, expect, request } from "@playwright/test";

const baseURL = "https://dummyjson.com";
const credentials = {
  username: "emilys",
  password: "emilyspass",
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

async function createAuthenticatedApiContext() {
  const anonymousContext = await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      "Content-Type": "application/json",
    },
  });

  const loginResponse = await anonymousContext.post("/auth/login", {
    data: credentials,
  });

  expect(loginResponse.ok()).toBeTruthy();

  const loginBody = (await loginResponse.json()) as LoginResponse;
  expect(loginBody.accessToken).toBeTruthy();

  await anonymousContext.dispose();

  const authenticatedContext = await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Authorization: `Bearer ${loginBody.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return {
    authenticatedContext,
    loginBody,
  };
}

test.describe("API auth with request context", () => {
  test("should authenticate and verify nested login response payload", async ({
    playwright,
  }) => {
    const { authenticatedContext, loginBody } =
      await createAuthenticatedApiContext();

    expect(loginBody).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        username: credentials.username,
        email: expect.stringContaining("@"),
        firstName: expect.any(String),
        lastName: expect.any(String),
        gender: expect.any(String),
        image: expect.stringContaining("http"),
      }),
    );

    await authenticatedContext.dispose();
  });

  test("should fetch authenticated user profile and verify large nested json", async ({
    playwright,
  }) => {
    const { authenticatedContext, loginBody } =
      await createAuthenticatedApiContext();

    const profileResponse = await authenticatedContext.get("/auth/me");
    expect(profileResponse.ok()).toBeTruthy();

    const profileBody = await profileResponse.json();

    expect(profileBody).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        username: credentials.username,
        email: loginBody.email,
        firstName: loginBody.firstName,
        lastName: loginBody.lastName,
        role: expect.any(String),
        address: expect.objectContaining({
          address: expect.any(String),
          city: expect.any(String),
          state: expect.any(String),
          stateCode: expect.any(String),
          postalCode: expect.any(String),
          coordinates: expect.objectContaining({
            lat: expect.any(Number),
            lng: expect.any(Number),
          }),
          country: expect.any(String),
        }),
        bank: expect.objectContaining({
          cardExpire: expect.any(String),
          cardNumber: expect.any(String),
          cardType: expect.any(String),
          currency: expect.any(String),
          iban: expect.any(String),
        }),
        company: expect.objectContaining({
          department: expect.any(String),
          name: expect.any(String),
          title: expect.any(String),
          address: expect.objectContaining({
            address: expect.any(String),
            city: expect.any(String),
            state: expect.any(String),
            stateCode: expect.any(String),
            postalCode: expect.any(String),
            coordinates: expect.objectContaining({
              lat: expect.any(Number),
              lng: expect.any(Number),
            }),
            country: expect.any(String),
          }),
        }),
        crypto: expect.objectContaining({
          coin: expect.any(String),
          wallet: expect.any(String),
          network: expect.any(String),
        }),
        hair: expect.objectContaining({
          color: expect.any(String),
          type: expect.any(String),
        }),
      }),
    );

    await authenticatedContext.dispose();
  });
});

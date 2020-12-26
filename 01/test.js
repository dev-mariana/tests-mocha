const assert = require("assert");
const { getPeople } = require("./service");

//instalamos o pacote nock, para simular requisições
const nock = require("nock");

describe("Star Wars Tests", () => {
  before(() => {
    const response = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: "R2-D2",
          height: "96",
          mass: "32",
          hair_color: "n/a",
          skin_color: "white, blue",
          eye_color: "red",
          birth_year: "33BBY",
          gender: "n/a",
          homeworld: "http://swapi.dev/api/planets/8/",
          films: [
            "http://swapi.dev/api/films/1/",
            "http://swapi.dev/api/films/2/",
            "http://swapi.dev/api/films/3/",
            "http://swapi.dev/api/films/4/",
            "http://swapi.dev/api/films/5/",
            "http://swapi.dev/api/films/6/",
          ],
          species: ["http://swapi.dev/api/species/2/"],
          vehicles: [],
          starships: [],
          created: "2014-12-10T15:11:50.376000Z",
          edited: "2014-12-20T21:17:50.311000Z",
          url: "http://swapi.dev/api/people/3/",
        },
      ],
    };

    nock('https://swapi.dev/api/people')
    .get('/?search=R2-D2&format=json')
    .reply(200, response);
  })

  it("You should look for R2-D2 with correct format", async () => {
    const expected = [{ name: "R2-D2", mass: "32" }];
    const baseName = "R2-D2";
    const result = await getPeople(baseName);
    assert.deepStrictEqual(result, expected);
  });
});

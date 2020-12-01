const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint) {
    this._endPoint = endPoint;
  }

  getRandomPokemon() {
    return this._load(`pokemons?random=true`)
      .then(Api.toJSON)
  }

  getAttack(attackParam) {
    return this._load(`fight?${attackParam}`)
      .then(Api.toJSON)
  }

  _load(GET) {
    return fetch(`${this._endPoint}${GET}`)
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}

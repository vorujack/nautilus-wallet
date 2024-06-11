export enum ACTIONS {
  INIT = "INIT",
  PUT_WALLET = "PUT_WALLET",
  LOAD_WALLETS = "LOAD_WALLETS",
  LOAD_SETTINGS = "LOAD_SETTINGS",
  SAVE_SETTINGS = "SAVE_SETTINGS",
  FETCH_AND_SET_AS_CURRENT_WALLET = "FETCH_AND_SET_AS_CURRENT_WALLET",
  REFRESH_CURRENT_ADDRESSES = "REFRESH_CURRENT_ADDRESSES",
  NEW_ADDRESS = "NEW_ADDRESS",
  FETCH_BALANCES = "FETCH_BALANCES",
  LOAD_BALANCES = "LOAD_BALANCES",
  FETCH_CURRENT_PRICES = "GET_CURRENT_PRICE",
  SET_CURRENT_WALLET = "SET_CURRENT_WALLET",
  SEND_TX = "SEND_TX",
  LOAD_CONNECTIONS = "LOAD_CONNECTIONS",
  REMOVE_CONNECTION = "REMOVE_CONNECTION",
  SIGN_TX = "SIGN_TX",
  UPDATE_WALLET_SETTINGS = "UPDATE_WALLET_SETTINGS",
  UPDATE_CHANGE_ADDRESS_INDEX = "UPDATE_CHANGE_ADDRESS_INDEX",
  UPDATE_USED_ADDRESSES_FILTER = "UPDATE_USED_ADDRESSES_FILTER",
  LOAD_MARKET_RATES = "LOAD_MARKET_RATES",
  REMOVE_WALLET = "REMOVE_WALLET",
  CHECK_PENDING_BOXES = "CHECK_PENDING_BOXES",
  LOAD_ASSETS_INFO = "LOAD_ASSETS_INFO",
  LOAD_TOKEN_BLACKLIST = "LOAD_TOKEN_BLACKLIST",
  FETCH_FULL_ASSETS_INFO = "FETCH_FULL_ASSETS_INFO",
  SIGN_EIP28_MESSAGE = "SIGN_EIP28_MESSAGE",
  TOGGLE_HIDE_BALANCES = "TOGGLE_HIDE_BALANCES"
}

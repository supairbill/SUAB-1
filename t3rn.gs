function getCalderaBalance(address, token) {
  if (!address || address.trim() === "") {
    return "Invalid address";
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return "Invalid Ethereum address";
  }

  // 选择 API
  let apiUrl = "";
  if (token === "BRN") {
    apiUrl = "https://brn.explorer.caldera.xyz/api/v2/addresses/" + address;
  } else if (token === "B2N") {
    apiUrl = "https://b2n.explorer.caldera.xyz/api/v2/addresses/" + address;
  } else {
    return "Invalid token type";
  }

  try {
    let response = UrlFetchApp.fetch(apiUrl, { muteHttpExceptions: true });
    let json = JSON.parse(response.getContentText());

    if (json && json.coin_balance !== undefined) {
      let balanceStr = json.coin_balance;
      let mainBalance = balanceStr.slice(0, -18);
      return mainBalance || "0";
    } else {
      return "0";
    }
  } catch (error) {
    return "Error: " + error.message;
  }
}

/**
 * 查询 BRN 余额
 */
function BRN_BALANCE(address) {
  return getCalderaBalance(address, "BRN");
}

/**
 * 查询 B2N 余额
 */
function B2N_BALANCE(address) {
  return getCalderaBalance(address, "B2N");
}

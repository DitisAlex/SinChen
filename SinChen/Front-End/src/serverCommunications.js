// import Config from './config.json'

const port = SERVER_PORT;
const serverHostname = `${window.location.hostname}:${port}`;
const serverFetchBase = `${window.location.protocol}//${serverHostname}`;

/**
 * Routes for SelectOrder
 */
export async function getTeppan() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  };

  return fetch(serverFetchBase + `/api/items/teppan`, fetchOptions);
}

export async function getGrill() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  };

  return fetch(serverFetchBase + `/api/items/grill`, fetchOptions);
}

export async function sendOrder(order, table, username) {
  const body =
  {
    ordered: order,
    table: table,
    user: username
  }

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body)
  };

  return fetch(serverFetchBase + `/api/orders/`, fetchOptions);
}

/**
 * Routes for ManageMeals
 */
export async function getItems() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  };

  return fetch(serverFetchBase + `/api/items/`, fetchOptions);
}

export async function deleteItem(item) {
  const body =
  {
    item: item
  }

  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body)
  };

  return fetch(serverFetchBase + `/api/items/`, fetchOptions);
}

export async function addItem(attribute, name, type) {
  const body =
  {
    attribute: attribute,
    name: name,
    type: type
  }

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body)
  };

  return fetch(serverFetchBase + `/api/items/`, fetchOptions);
}

/**
 * Routes for Login
 */
export async function loginUser(username, password) {
  const body = {
    username: username,
    password: password
  }

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body)
  };

  return fetch(serverFetchBase + `/api/users/login`, fetchOptions);
}

/**
 * Routes for Logout
 */
export async function logoutUser() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    mode: "cors",
  };
  return fetch(
    serverFetchBase + `/api/users/logout`, fetchOptions);
}

/**
 * Routes for App
 */
export async function checkAuthenticated() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    mode: "cors",
  };
  return fetch(
    serverFetchBase + `/api/users/isAuthenticated`, fetchOptions);
}


/**
 * Routes for ManageMeals
 */
export async function getUsers() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    mode: "cors",
  };
  return fetch(
    serverFetchBase + `/api/users/`, fetchOptions);
}

export async function registerUser(username, password, role) {
  const body = {
    username: username,
    password: password,
    role: role
  }

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body)
  };
  return fetch(
    serverFetchBase + `/api/users/register`, fetchOptions);
}

export async function changePassword(username, password) {
  const body = {
    username: username,
    password: password
  }

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body)
  };
  return fetch(
    serverFetchBase + `/api/users/`, fetchOptions);
}

export async function deleteUser(username) {
  const body = {
    username: username
  }

  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body)
  };
  return fetch(
    serverFetchBase + `/api/users/`, fetchOptions);
}

/**
 * Routes for ManageOrder
 */
export async function getOrders() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    mode: "cors"
  };
  return fetch(
    serverFetchBase + `/api/orders/`, fetchOptions);
}

export async function findOrder(table, user) {
  const body = {
    user: user,
    table: table
  }

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body)
  };
  return fetch(
    serverFetchBase + `/api/orders/find`, fetchOptions);
}
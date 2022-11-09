async function getCurrentClient() {
  return (await import("../../../../src/client.js")).default;
}
export {
  getCurrentClient
};

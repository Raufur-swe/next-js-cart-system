
// this file is used to declare the module for redux-persist storage which is used in the store.ts file to import the storage from redux-persist

declare module "redux-persist/lib/storage" {
  const storage: any;
  export default storage;
}
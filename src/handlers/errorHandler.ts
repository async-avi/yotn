export default async function errorHandler(status: number, msg: any) {
  return {
    status,
    msg,
  };
}

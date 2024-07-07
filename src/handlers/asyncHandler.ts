export default async function asyncHandler(
  status: number,
  msg: string,
  data: any
) {
  return {
    status,
    msg,
    data,
  };
}

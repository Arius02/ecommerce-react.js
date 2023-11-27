 const setColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "success";
      case "processing":
        return "info";
      case "waitPayment":
        return "warning";
      case "shipped":
        return "primary";
      default:
        return "error";
    }

};
export default setColor 
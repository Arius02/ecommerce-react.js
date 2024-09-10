 /**
 * Returns a color class based on the given status.
 *
 * @param status - The status of the item.
 * @returns A string representing the color class associated with the status.
 */
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
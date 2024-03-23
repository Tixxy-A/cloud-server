const notFoundMiddleWare = (req, res) => {
  res.status(404).json({
    message: "Opps! Page Not Found!",
  });
};

export default notFoundMiddleWare;

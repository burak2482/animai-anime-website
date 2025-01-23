
const checkAdmin = async (req,res,next) => {
  if(req.user && req.user.userRole === admin) {
    next();
  } else {
    res.status(403).json({message: 'Only admin can access this!'})
  }
}

export default checkAdmin
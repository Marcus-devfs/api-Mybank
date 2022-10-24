
privateRoutes = async (req, res) => {

    const id = req.params.id
    //check user
    const user = await User.findById(id, `-password`)
  
    if (!user) {
      return res.status(404).json({ msg: 'Usuario não encontrado' })
    }
    return res.status(200).json({ user })
  }
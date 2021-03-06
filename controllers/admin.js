const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(()=> {
    res.redirect('/');
  }).catch(err => {
    console.log(err);
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const id = req.params.id;

  req.user.getProducts({where: {id: id}})
  // Product.findByPk(id)
  .then(products=> {
    const product = products[0];
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }).catch(err => console.log(err));
};

exports.postEditProduct = (req, res,  next)=> {
  // console.log("product Updated!!!");
  const id = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.update({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  },{where: {id:id}}).then(()=> {
    res.redirect("/admin/products");
  }).catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  
  req.user.getProducts()
  // Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err=> console.log(err));
  
};

exports.postDeleteProduct = (req, res , next)=> {
  const id = req.body.id; 
  Product.destroy({
    where: {id: id}
  }).then(()=> {
    res.redirect('/admin/products');
  }).catch(err => console.log(err));
}

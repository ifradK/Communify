app.get('/', function(req, res) {
    res.sendFile(__dirname+"\\home.html");
  });
  
  
  app.post('/signin', function(req,res){
    console.log('Client-side code running');
  
    res.sendFile(__dirname+"\\signin.html"); 
  })
  
  app.post('/signup', function(req,res){
    console.log('Client-side code running');
  
    res.sendFile(__dirname+"\\signup.html"); 
  })
  
  app.post('/usersignup', function(req,res){
  
    var username = req.body.username; 
    var password = req.body.password; 
    var confirm_password = req.body.confirm_password; 
  
    var flag = new Boolean(false);
  
    con.query('SELECT Username FROM `user_login`', function (err, result, fields) {
      if (err) throw err;
      else
      {
        for(var i=0; i<result.length;i++)
        {
          if(result[i]==username)
          {
            flag=true;
            break;
          }
        }
      }
      
    });
  
    if(flag===false && password===confirm_password)
    {
      var insertQuery = 'insert into `user_login` (`Username`,`Password`) values (?,?)';
      var query = mysql.format(insertQuery,[username,password]);
      con.query(query,function(err,response){
        if(err) throw err;
        else
        {
          console.log("User Created!");
          res.sendFile(__dirname+"\\home.html");
        }
      });
    }
    else if(flag===true)
    {
      console.log("Username Already Taken!");
    }
    else
    {
      console.log("Confirm password does not match. Try Again!");
      res.sendFile(__dirname+"\\signup.html");
    }
  })
  
  
  var globalUser;
  
  app.post('/usersignin', function(req,res){
  
    var username = req.body.username; 
    var password = req.body.password; 
    
    var flag1 = 0;
  
    con.query('SELECT Username,Password FROM `user_login`', function (err, result, fields) {
      if (err) throw err;
      else
      {
        for(var i=0; i<result.length;i++)
        {
          if(result[i].Username===username && result[i].Password===password)
          {
            flag1=1;
            break;
          }
        }
      }
    });
    setTimeout(() => {  
      if(flag1===1)
      {
        globalUser=username;
        console.log("User Signed In!");
        res.redirect("http://localhost:3000/");
      }
      else
      {
        console.log("Username or Password does not match. Try Again!");
      } }, 200);
    
  })
  
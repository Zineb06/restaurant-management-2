
<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Rest-App</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item ">
      <a class="nav-link" href="{{ url('/') }}">Home Page </a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="{{ url('admin') }}">Dashboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{ url('clients') }}">Clients </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{ url('tables') }}">Tables </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{ url('reservations') }}">Reservations </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{ url('menus') }}">Menus </a>
      </li>
    </ul>
    
  </div>
</nav>
  
<div class="container">
    @yield('content')
</div>
   
</body>
</html>
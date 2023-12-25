<?php

namespace App\Http\Controllers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\menu;
use Illuminate\View\View;

class menuController extends Controller
{
    public function index() : View 
    {
        $menu = menu::all();
        return view('menus.index')-> with ('menu', $menu);
    }

    public function create(): View
    {
        return view('menus.create');
    }
  
    public function store(Request $request): RedirectResponse
    {
        $requestData = $request->all();
        $fileName = $request->file('image')->getClientOriginalName();
        $path = $request->file('image')->storeAs('images', $fileName);
        $requestData['image'] = '/storage/'.$path;
        Menu::create($requestData);
        return redirect('menus')->with('add_message', 'Menu Addedd!');

    }
    public function show(string $id): View
    {
        $menu = Menu::find($id);
        return view('menus.show')->with('menu', $menu);
    }

    public function edit(string $id): View
    {
        $menu = Menu::find($id);
        return view('menus.edit')->with('menu', $menu);
    }
    public function update(Request $request, string $id): RedirectResponse
    {
        $menu = Menu::find($id);
        $input = $request->all();
        $menu->update($input);
        return redirect('menus')->with('update_message', 'menu Updated!');  
    }
    
    public function destroy(string $id): RedirectResponse
    {
        menu::destroy($id);
        return redirect('menus')->with('delete_message', 'menu deleted!'); 
    }

}
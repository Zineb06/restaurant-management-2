<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Menu;

class MenuController extends Controller
{
    public function index(): JsonResponse
    {
        $menuItems = Menu::all();
        return response()->json(['menu' => $menuItems]);
    }

    public function destroy($id)
    {
        $menuItem = Menu::find($id);

        if (!$menuItem) {
            return response()->json(['message' => 'Menu item not found'], 404);
        }

        $menuItem->delete();

        return response()->json(['message' => 'Menu item deleted successfully']);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'category' => 'required',
            'dish' => 'required',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $requestData = $request->all();
        $requestData['image'] = $this->handleImage($request, 'image');

        Menu::create($requestData);

        // $requestData = $request->all();
        // $fileName = $request->file('image')->getClientOriginalName();
        // $path = $request->file('image')->storeAs('public/images', $fileName);
        // $requestData['image'] = '/storage/images/'.$fileName;
        // Menu::create($requestData);

        return response()->json(['message' => 'Menu added successfully'], 201);
    }

    public function update(Request $request, $id)
    {
        // Validation des données
        $request->validate([
            'category' => 'required|string',
            'dish' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Mise à jour du menu item
        $menuItem = Menu::findOrFail($id);
        $menuItem->category = $request->input('category');
        $menuItem->dish = $request->input('dish');
        $menuItem->price = $request->input('price');

        // Vérifiez et traitez l'image si nécessaire
        if ($request->hasFile('image')) {
            $menuItem->image = $this->handleImage($request, 'image');
        }

        $menuItem->save();

        return response()->json(['message' => 'Menu item updated successfully']);
    }

    public function show($id)
    {
        $menuItem = Menu::find($id);

        if (!$menuItem) {
            return response()->json(['message' => 'Menu item not found'], 404);
        }

        return response()->json(['menuItem' => $menuItem], 200);
    }

    private function handleImage(Request $request, $fieldName): string
    {
        $fileName = $request->file($fieldName)->getClientOriginalName();
        $path = $request->file($fieldName)->storeAs('images', $fileName);
        return '/storage/' . $path;
    }
}
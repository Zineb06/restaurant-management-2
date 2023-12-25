<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('menu');
        Schema::create('menu', function (Blueprint $table) {
            $table->id('idMenu');
            $table->string('image',300);
            $table->string('category');
            $table->string('dish');
            $table->decimal('price', 8, 2);
            $table->timestamps();
        });
    }

    
};

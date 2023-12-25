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
        Schema::dropIfExists('reservation');
        Schema::create('reservation', function (Blueprint $table) {
            $table->id('idReservation');
            $table->string('NumTable');
            $table->string('date');
            $table->string('time');
            $table->integer('idClient');
            $table->integer('GuestsNumber');
            $table->string('Status');
            $table->timestamps();
        });
    }

};

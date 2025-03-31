<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('code', 7)->unique(); // 3 letters + 4 digits
            $table->string('title', 50);
            $table->text('description');
            $table->integer('credit_hours');
            $table->enum('level', ['beginner', 'intermediate', 'advanced']);
            $table->enum('status', ['active', 'inactive']);
            $table->trails();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};

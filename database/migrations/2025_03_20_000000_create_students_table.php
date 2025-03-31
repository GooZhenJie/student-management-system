<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name', 30);
            $table->string('student_id', 11)->unique(); // 3 letters + 8 digits
            $table->string('email')->unique();
            $table->string('phone_number', 11);
            $table->string('address');
            $table->enum('gender', ['male', 'female']);
            $table->enum('status', ['active', 'inactive', 'graduated', 'suspended'])->default('active');
            $table->date('date_of_birth');
            $table->trails();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};

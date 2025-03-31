<?php

namespace Database\Factories;

use App\Enums\Gender;
use App\Enums\StudentStatus;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class StudentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => Str::limit(fake()->name(), 30, ''),
            'student_id' => 'STU' . fake()->unique()->numerify('########'), // 3 letters + 8 digits
            'email' => fake()->unique()->safeEmail(),
            'phone_number' => Str::limit(fake()->phoneNumber(), 11, ''),
            'address' => fake()->address(),
            'gender' => fake()->randomElement(Gender::cases()),
            'status' => fake()->randomElement(StudentStatus::cases()),
            'date_of_birth' => fake()->dateTimeBetween('-30 years', '-18 years')->format('Y-m-d'),
            'created_by' => 1,
            'created_at' => now(),
            'updated_by' => 1,
            'updated_at' => now(),
        ];
    }
}

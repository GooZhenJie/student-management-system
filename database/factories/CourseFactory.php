<?php

namespace Database\Factories;

use App\Enums\CourseLevel;
use App\Enums\CourseStatus;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'code' => strtoupper(Str::random(3)) . fake()->unique()->numerify('####'), // 3 letters + 4 digits
            'title' => Str::limit(fake()->sentence(3), 50, ''),
            'description' => fake()->paragraphs(3, true),
            'credit_hours' => fake()->numberBetween(1, 5),
            'level' => fake()->randomElement(CourseLevel::cases()),
            'status' => fake()->randomElement(CourseStatus::cases()),
            'created_by' => 1,
            'created_at' => now(),
            'updated_by' => 1,
            'updated_at' => now(),
        ];
    }

    public function beginner()
    {
        return $this->state(function (array $attributes) {
            return [
                'level' => CourseLevel::BEGINNER,
                'credit_hours' => fake()->numberBetween(1, 2),
            ];
        });
    }

    public function intermediate()
    {
        return $this->state(function (array $attributes) {
            return [
                'level' => CourseLevel::INTERMEDIATE,
                'credit_hours' => fake()->numberBetween(2, 3),
            ];
        });
    }

    public function advanced()
    {
        return $this->state(function (array $attributes) {
            return [
                'level' => CourseLevel::ADVANCED,
                'credit_hours' => fake()->numberBetween(3, 5),
            ];
        });
    }
}

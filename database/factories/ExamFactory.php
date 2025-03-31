<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExamFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Midterm Examination',
                'Final Examination',
                'Quarterly Test',
                'Practical Exam',
                'Theoretical Assessment'
            ]) . ' ' . now()->year,
            'course_id' => Course::factory(),
            'description' => fake()->optional(0.7)->paragraph,
            'date' => fake()->dateTimeBetween('+1 week', '+3 months')->format('Y-m-d'),
            'created_by' => 1,
            'created_at' => now(),
            'updated_by' => 1,
            'updated_at' => now(),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Enums\StudentCourseStatus;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentCourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'student_id' => Student::factory(),
            'course_id' => Course::factory(),
            'status' => fake()->randomElement(StudentCourseStatus::cases()),
            'enrollment_date' => fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
            'created_by' => 1,
            'created_at' => now(),
            'updated_by' => 1,
            'updated_at' => now(),
        ];
    }

    public function registered()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => StudentCourseStatus::REGISTERED,
                'enrollment_date' => now()->format('Y-m-d'),
            ];
        });
    }

    public function completed()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => StudentCourseStatus::COMPLETED,
                'enrollment_date' => fake()->dateTimeBetween('-1 year', '-1 month')->format('Y-m-d'),
            ];
        });
    }

    public function dropped()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => StudentCourseStatus::DROPPED,
                'enrollment_date' => fake()->dateTimeBetween('-1 year', '-1 week')->format('Y-m-d'),
            ];
        });
    }

    public function failed()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => StudentCourseStatus::FAILED,
                'enrollment_date' => fake()->dateTimeBetween('-1 year', '-1 week')->format('Y-m-d'),
            ];
        });
    }
}

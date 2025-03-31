<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Exam;
use App\Models\Student;
use App\Models\StudentCourse;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExamMarkFactory extends Factory
{
    public function definition(): array
    {
        $marks = fake()->randomFloat(2, 0, 100);

        return [
            'student_id' => Student::factory(),
            'exam_id' => Exam::factory(),
            'marks' => $marks,
            'remarks' => fake()->optional(0.3)->sentence,
            'created_by' => 1,
            'created_at' => now(),
            'updated_by' => 1,
            'updated_at' => now(),
        ];
    }

    private function calculateGrade(float $marks): string
    {
        return match (true) {
            $marks >= 90 => 'A',
            $marks >= 80 => 'B',
            $marks >= 70 => 'C',
            $marks >= 60 => 'D',
            $marks >= 50 => 'E',
            default => 'F',
        };
    }
}

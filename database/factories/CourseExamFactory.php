<?php

namespace Database\Factories;

use App\Enums\StudentCourseStatus;
use App\Models\Course;
use App\Models\Exam;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseExamFactory extends Factory
{
    public function definition(): array
    {
        return [
            'course_id' => Course::factory(),
            'exam_id' => Exam::factory(),
            'created_by' => 1,
            'created_at' => now(),
            'updated_by' => 1,
            'updated_at' => now(),
        ];
    }
}

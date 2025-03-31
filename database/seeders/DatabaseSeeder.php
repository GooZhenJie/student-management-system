<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Exam;
use App\Models\ExamMark;
use App\Models\Student;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $students = Student::factory(10)->create();

        $courses = Course::factory()->createMany([
            ['title' => 'Computer Science'],
            ['title' => 'Mathematics for Engineers'],
            ['title' => 'Introduction to Psychology'],
            ['title' => 'Physics Fundamentals'],
            ['title' => 'Business Management'],
        ]);

        $exams = Exam::factory(10)->create([
            'course_id' => $courses->random()->id,
        ]);

        for ($i = 0; $i < 200; $i++) {
            $studentId = $students->random()->id;
            $examId = $exams->random()->id;

            if (!ExamMark::where('student_id', $studentId)->where('exam_id', $examId)->exists()) {
                ExamMark::factory()->create([
                    'student_id' => $studentId,
                    'exam_id' => $examId,
                ]);
            }
        }
    }
}

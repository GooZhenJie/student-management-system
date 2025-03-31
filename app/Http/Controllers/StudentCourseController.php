<?php

namespace App\Http\Controllers;

use App\Enums\CourseStatus;
use App\Enums\StudentCourseStatus;
use App\Models\Course;
use App\Models\Student;
use App\Models\StudentCourse;
use Illuminate\Http\Request;

class StudentCourseController extends Controller
{
    public function store(Request $request, Course $course)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id'
        ]);

        if (StudentCourse::where('course_id', $course->id)->where('student_id', $request->student_id)->exists()) {
            return redirect()->back()->with('error', 'Student is already enrolled in this course');
        }

        StudentCourse::create([
            'student_id' => $request->student_id,
            'course_id' => $course->id,
            'status' => StudentCourseStatus::REGISTERED,
            'enrollment_date' => now(),
        ]);

        return redirect()->back()->with('success', 'Student enrolled successfully.');
    }

    public function destroy(Course $course, Student $student)
    {
        $studentCourse = StudentCourse::where('course_id', $course->id)
            ->where('student_id', $student->id)
            ->first();

        if (!$studentCourse) {
            return redirect()->back()->with('error', 'Student is not enrolled in this course');
        }

        $studentCourse->delete();

        return redirect()->back()->with('success', 'Student removed from course.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Enums\CourseLevel;
use App\Enums\CourseStatus;
use App\Enums\StudentStatus;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Models\Exam;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function index(): Response
    {
        $courses = Course::orderBy('id', 'desc')->get()->map
            ->toExportableArray();

        return Inertia::render('course/index', [
            'courses' => $courses,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('course/create', [
            'levels' => CourseLevel::GetKeyValuePair(),
            'statuses' => CourseStatus::GetKeyValuePair(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $fields = $request->validate([
            'code'   => ['required', 'string', 'max:20', 'unique:courses,code'],
            'title'         => ['required', 'string', 'max:255'],
            'description'   => ['required', 'string', 'max:500'],
            'credit_hours'  => ['required', 'integer', 'min:1', 'max:5'],
            'level'         => ['required', Rule::in(CourseLevel::cases())],
            'status'        => ['required', Rule::in(CourseStatus::cases())],
        ]);

        $fields = array_merge($fields, [
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        $course = Course::create($fields);

        return redirect()->route('course.edit', $course->id)->with('success', 'Course added successfully.');
    }

    public function edit(Course $course): Response
    {
        $enrolledStudentIds = $course->students()->pluck('students.id');
        $courseExamIds = $course->exams()->pluck('exams.id');

        return Inertia::render('course/edit', [
            'course' => new CourseResource($course)->toArray(request()),
            'levels' => CourseLevel::GetKeyValuePair(),
            'statuses' => CourseStatus::GetKeyValuePair(),
            'allStudents' => Student::where('status', StudentStatus::ACTIVE)
                ->whereNotIn('id', $enrolledStudentIds)
                ->get(),
            'allExams' => Exam::where('course_id', null)->get(),
        ]);
    }

    public function update(Request $request, Course $course): RedirectResponse
    {
        $fields = $request->validate([
            'code'   => ['required', 'string', 'max:20', Rule::unique('courses', 'code')->ignore($course->id)],
            'title'         => ['required', 'string', 'max:255'],
            'description'   => ['required', 'string', 'max:500'],
            'credit_hours'  => ['required', 'integer', 'min:1', 'max:5'],
            'level'         => ['required', Rule::in(CourseLevel::cases())],
            'status'        => ['required', Rule::in(CourseStatus::cases())],
        ]);

        $fields['updated_by'] = Auth::id();

        $course->update($fields);

        return redirect()->route('course.edit', $course->id)
            ->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course): RedirectResponse
    {
        $course->delete();

        return redirect()->route('course.index')
            ->with('success', 'Course deleted successfully.');
    }
}

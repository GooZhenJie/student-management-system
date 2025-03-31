<?php

namespace App\Http\Controllers;

use App\Enums\Gender;
use App\Enums\StudentStatus;
use App\Models\Student;
use App\Traits\ExportableFields;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    use ExportableFields;

    public function index(): Response
    {
        $students = Student::orderBy('id', 'desc')
            ->get()
            ->map
            ->toExportableArray();

        return Inertia::render('student/index', [
            'students' => $students,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('student/create', [
            'genders' => Gender::GetKeyValuePair(),
            'statuses' => StudentStatus::GetKeyValuePair(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $fields = $request->validate([
            'name' => ['required',],
            'student_id' => ['required', 'unique:students,student_id'],
            'email' => ['required', 'email', 'unique:students,email'],
            'phone_number' => ['required', 'min:10', 'max:11'],
            'address' => ['required',],
            'gender' => ['required', Rule::in(Gender::cases())],
            'status' => ['required', Rule::in(StudentStatus::cases())],
            'date_of_birth' => ['required', 'date', 'before:today'],
        ]);

        $fields = array_merge($fields, [
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        $student = Student::create($fields);

        return redirect()->route('student.edit', $student->id)->with('success', 'Student added successfully.');
    }

    public function edit(Student $student): Response
    {
        return Inertia::render('student/edit', [
            'student' => $student,
            'genders' => Gender::GetKeyValuePair(),
            'statuses' => StudentStatus::GetKeyValuePair(),
        ]);
    }

    public function update(Request $request, Student $student): RedirectResponse
    {
        $fields = $request->validate([
            'name' => ['required'],
            'student_id' => ['required', Rule::unique('students')->ignore($student->id)],
            'email' => ['required', 'email', Rule::unique('students')->ignore($student->id)],
            'phone_number' => ['required', 'min:10', 'max:11'],
            'address' => ['required'],
            'gender' => ['required', Rule::in(Gender::cases())],
            'status' => ['required', Rule::in(StudentStatus::cases())],
            'date_of_birth' => ['required', 'date', 'before:today'],
        ]);

        $fields['updated_by'] = Auth::id();

        $student->update($fields);

        return redirect()->route('student.edit', $student->id)
            ->with('success', 'Student updated successfully.');
    }

    public function destroy(Student $student): RedirectResponse
    {
        $student->delete();

        return redirect()->route('student.index')
            ->with('success', 'Student deleted successfully.');
    }
}

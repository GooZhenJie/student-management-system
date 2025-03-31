<?php

namespace App\Http\Controllers;

use App\Enums\Gender;
use App\Enums\StudentStatus;
use App\Models\Course;
use App\Models\Exam;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ExamController extends Controller
{
    public function index(): Response
    {
        $exams = Exam::orderBy('id', 'desc')->get()
            ->map
            ->toExportableArray();

        return Inertia::render('exam/index', [
            'exams' => $exams,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('exam/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $fields = $request->validate([
            'name'   => ['required', 'string', 'max:255', 'unique:exams,name'],
            'description' => ['required', 'string', 'max:500'],
            'date'   => ['required', 'date', 'after_or_equal:today'],
        ]);

        $fields = array_merge($fields, [
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        $exam = Exam::create($fields);

        return redirect()->route('exam.edit', $exam->id)->with('success', 'Exam added successfully.');
    }

    public function edit(Exam $exam): Response
    {
        return Inertia::render('exam/edit', [
            'exam' => $exam,
        ]);
    }

    public function update(Request $request, Exam $exam): RedirectResponse
    {
        $fields = $request->validate([
            'name'   => ['required', 'string', 'max:255', Rule::unique('exams', 'name')->ignore($exam->id)],
            'description' => ['required', 'string', 'max:500'],
            'date'   => ['required', 'date', 'after_or_equal:today'],
        ]);

        $fields['updated_by'] = Auth::id();

        $exam->update($fields);

        return redirect()->route('exam.edit', $exam->id)
            ->with('success', 'Exam updated successfully.');
    }

    public function destroy(Exam $exam): RedirectResponse
    {
        $exam->delete();

        return redirect()->route('exam.index')
            ->with('success', 'Exam deleted successfully.');
    }

    public function linkToCourse(Request $request, Course $course)
    {
        $request->validate([
            'exam_id' => 'required|exists:exams,id'
        ]);

        if (Exam::where('course_id', $course->id)->where('id', $request->exam_id)->exists()) {
            return redirect()->back()->with('error', 'Exam is already linked to this course.');
        }

        $exam = Exam::where('id', $request->exam_id)->first();
        $exam->course_id = $course->id;
        $exam->save();

        return redirect()->back()->with('success', 'Exam added to course successfully.');
    }
}

<?php

namespace App\Models;

use App\Enums\Gender;
use App\Enums\StudentStatus;
use App\Traits\ExportableFields;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory, ExportableFields;

    protected $guarded = [];

    protected $exportableFieldMap = [
        // 'ID' => 'id',
        'Name' => 'name',
        'Student ID' => 'student_id',
        'Email' => 'email',
        'Phone Number' => 'phone_number',
        'Address' => 'address',
        'Gender' => 'gender',
        'Status' => 'status',
        'Date of Birth' => 'date_of_birth',
        'Created At' => 'created_at',
        'Created By' => 'createdBy.name',
        'Updated At' => 'updated_at',
        'Updated By' => 'updatedBy.name',
    ];

    protected function casts(): array
    {
        return [
            'gender' => Gender::class,
            'status' => StudentStatus::class,
        ];
    }

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_student');
    }

    public function examMarks(): HasMany
    {
        return $this->hasMany(ExamMark::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}

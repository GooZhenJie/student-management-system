<?php

namespace App\Models;

use App\Traits\ExportableFields;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Exam extends Model
{
    use HasFactory, ExportableFields;

    protected $guarded = [];

    protected $exportableFieldMap = [
        // 'ID' => 'id',
        'Exam Name' => 'name',
        'Description' => 'description',
        'Exam Date' => 'date',
        'Created At' => 'created_at',
        'Created By' => 'createdBy.name',
        'Updated At' => 'updated_at',
        'Updated By' => 'updatedBy.name',
    ];

    public function courses(): BelongsTo
    {
        return $this->BelongsTo(Course::class);
    }

    public function examMarks(): HasMany{
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

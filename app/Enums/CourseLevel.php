<?php

namespace App\Enums;

use App\Traits\Enum;

enum CourseLevel: string
{
    use Enum;

    case BEGINNER = 'beginner';
    case INTERMEDIATE = 'intermediate';
    case ADVANCED = 'advanced';
}

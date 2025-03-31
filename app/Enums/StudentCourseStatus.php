<?php

namespace App\Enums;

use App\Traits\Enum;

enum StudentCourseStatus: string
{
    use Enum;

    case REGISTERED = 'registered';
    case COMPLETED = 'completed';
    case DROPPED = 'dropped';
    case FAILED = 'failed';
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Permission } from '../../../interfaces/permission';
import { PermissionService } from '../../../services/permission.service';
import { FormArray } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css', '../../secure.component.css']
})
export class RoleCreateComponent implements OnInit {

  form!: FormGroup;
  permissions: Permission[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private router: Router
  ) { }

  get permissionArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      permissions: this.formBuilder.array([])
    });

    this.permissionService.all().subscribe(
      permissions => {
        this.permissions = permissions;

        this.permissions.forEach(p => {
          this.permissionArray.push(
            this.formBuilder.group({
              id: p.id,
              value: false
            })
          );
        });
      }
    );
  }

  submit(): void {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
      permissions: formData.permissions
        .filter((p: any) => p.value === true)
        .map((p: any) => p.id)
      };

      this.roleService.create(data).subscribe(
        () => this.router.navigateByUrl('/roles')
      );
    }
  }


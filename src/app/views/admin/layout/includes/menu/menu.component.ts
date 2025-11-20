import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';
import { AcaibMenu, AdminMenu, CapeMenu, CpsMenu, DDASMMenu, DFEAMenu, ErrorMenu, MemberMenu, MinistreMenu, ServiceMenu } from '../menu';
import * as $ from 'jquery'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu:any[]=[]
  user:any
  role:any
  sidebarOpen = false;

  constructor(
    private authService:AuthService,
    private router: Router,
    private toastr:ToastrService,
    private lsService:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name

    switch (this.role) {
      case "admin":
        this.menu=AdminMenu

        break;
      case "ministre":
        this.menu=MinistreMenu

        break;
      case "cps":
        this.menu=CpsMenu

        break;
      case "ddasm":
        this.menu=DDASMMenu

        break;
      case "dfea":
        this.menu=DFEAMenu

        break;
      case "member":
        this.menu=MemberMenu

        break;
      case "cape":
        this.menu=CapeMenu

        break;
      case "service":
        this.menu=ServiceMenu

        break;
      case "Acaib":
        this.menu=AcaibMenu

        break;
    
      default:
        this.menu=ErrorMenu

        break;
    }
    $(".toggle-icon").click(function() {
      $(".wrapper").hasClass("toggled") ? ($(".wrapper").removeClass("toggled"), $(".sidebar-wrapper").unbind("hover")) : ($(".wrapper").addClass("toggled"), $(".sidebar-wrapper").hover(function() {
        $(".wrapper").addClass("sidebar-hovered")
      }, function() {
        $(".wrapper").removeClass("sidebar-hovered")
      }))
    })
  }


    expandedItems: number[] = [];

  handleItemClick(item: any) {
    if (item.children) {
      if (this.expandedItems.includes(item.id)) {
        this.expandedItems = this.expandedItems.filter(id => id !== item.id);
      } else {
        this.expandedItems.push(item.id);
      }
    } else if (item.route) {
      this.router.navigate([ item.route])
      // TODO: Navigation Angular Router
    }
  }

  toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}

  isActive(path?: string): boolean {
    // TODO: brancher avec Router
    return false;
  }
}

using UserLibrary.ServiceContracts;
using UserLibrary.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using Common.Data.DataContracts;
//using Common.Data.DataServices;
using Common.Data.DataServices;
using UserLibrary.Common;
using Microsoft.AspNetCore.Http;
using UserLibrary.Common;

namespace CommonTests.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IApplicationSettings appSettings;
        public IConfiguration Configuration { get; }
       // public Common.Core.Common.IApplicationSettings appSettings;
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddScoped<UserLibrary.ServiceContracts.IMenuService, MenuService>();
            services.AddScoped<UserLibrary.ServiceContracts.ILoggerService, LoggerService>();

            services.AddScoped<UserLibrary.DataContract.IMenuDataService, MenuDataService>();
            services.AddScoped<UserLibrary.DataContract.ILoggerDataService, LoggerDataService>();
            //services.AddScoped<IAdminService, AdminService>();
            //services.AddScoped<IAdminDataService, AdminDataService>();
            //services.AddScoped<ICommonService, CommonService>();
            appSettings = new ApplicationSettings();
            appSettings.ApplicationParameters.ApplicationEncryptionKey = Configuration.GetSection("ApplicationParameters:ApplicationEncryptionKey").Value;
            appSettings.ConnectionString.DB = Configuration.GetConnectionString("DefaultConnection");
            services.AddSingleton<IApplicationSettings>(appSettings);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
